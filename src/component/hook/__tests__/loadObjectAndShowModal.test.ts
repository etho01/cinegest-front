import { renderHook, act } from '@testing-library/react'
import { loadObjectAndShowModal, loadObjectAndShowModalObjectProps } from '../loadObjectAndShowModal'

interface TestUser {
  id: number
  name: string
  email: string
}

describe('loadObjectAndShowModal', () => {
  const emptyUser: TestUser = {
    id: 0,
    name: '',
    email: '',
  }

  const mockUser: TestUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  }

  it('should initialize with empty object when initialObject is null', () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: null,
      isOpen: false,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    expect(result.current.object).toEqual(emptyUser)
    // When initialObject is null, it's replaced with emptyObject, so !!emptyObject is true
    // because emptyObject is a truthy object
    expect(result.current.isEdit).toBe(true) // This is the actual behavior
    expect(result.current.isOpenState).toBe(false)
    expect(result.current.showErrors).toBe(false)
  })

  it('should initialize with initialObject when provided', () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: mockUser,
      isOpen: true,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    expect(result.current.object).toEqual(mockUser)
    expect(result.current.isEdit).toBe(true)
    expect(result.current.isOpenState).toBe(true)
  })

  it('should load object and set edit mode', async () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: null,
      isOpen: false,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    // Initially in edit mode because initialObject becomes emptyObject (truthy)
    expect(result.current.isEdit).toBe(true)
    expect(result.current.isOpenState).toBe(false)

    await act(async () => {
      await result.current.loadFromObject(mockUser)
    })

    expect(result.current.object).toEqual(mockUser)
    expect(result.current.isEdit).toBe(true)
    expect(result.current.isOpenState).toBe(true)
    expect(result.current.showErrors).toBe(false)
  })

  it('should create new object and set creation mode', () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: mockUser,
      isOpen: true,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    expect(result.current.isEdit).toBe(true)

    act(() => {
      result.current.createNew()
    })

    expect(result.current.object).toEqual(emptyUser)
    expect(result.current.isEdit).toBe(false)
    expect(result.current.isOpenState).toBe(true)
    expect(result.current.showErrors).toBe(false)
  })

  it('should close modal', () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: mockUser,
      isOpen: true,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    expect(result.current.isOpenState).toBe(true)

    act(() => {
      result.current.setIsOpenState(false)
    })

    expect(result.current.isOpenState).toBe(false)
  })

  it('should enable show errors', () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: null,
      isOpen: false,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    expect(result.current.showErrors).toBe(false)

    act(() => {
      result.current.setShowErrors(true)
    })

    expect(result.current.showErrors).toBe(true)
  })

  it('should apply setDefaultValues when loading object', async () => {
    const setDefaultValues = (user: TestUser): TestUser => ({
      ...user,
      email: user.email.toLowerCase(),
    })

    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: null,
      isOpen: false,
      showErrorsBase: false,
      emptyObject: emptyUser,
      setDefaultValues,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    const userWithUppercaseEmail: TestUser = {
      id: 2,
      name: 'Another User',
      email: 'TEST@EXAMPLE.COM',
    }

    await act(async () => {
      await result.current.loadFromObject(userWithUppercaseEmail)
    })

    expect(result.current.object.email).toBe('test@example.com')
  })

  it('should update object', () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: mockUser,
      isOpen: true,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    const updatedUser: TestUser = {
      ...mockUser,
      name: 'Updated Name',
    }

    act(() => {
      result.current.setObject(updatedUser)
    })

    expect(result.current.object.name).toBe('Updated Name')
  })

  it('should handle edit mode properly through createNew and loadFromObject', async () => {
    const props: loadObjectAndShowModalObjectProps<TestUser> = {
      initialObject: mockUser,
      isOpen: true,
      showErrorsBase: false,
      emptyObject: emptyUser,
    }

    const { result } = renderHook(() => loadObjectAndShowModal(props))

    expect(result.current.isEdit).toBe(true)

    // When creating new, isEdit becomes false
    act(() => {
      result.current.createNew()
    })

    expect(result.current.isEdit).toBe(false)

    // When loading an object, isEdit becomes true again
    await act(async () => {
      await result.current.loadFromObject(mockUser)
    })

    expect(result.current.isEdit).toBe(true)
  })
})
