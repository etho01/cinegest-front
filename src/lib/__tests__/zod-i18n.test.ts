import { z } from '../zod-i18n'

describe('zod-i18n', () => {
  it('should provide error messages for required fields', () => {
    const schema = z.object({
      name: z.string(),
    })

    const result = schema.safeParse({})
    
    expect(result.success).toBe(false)
    if (!result.success) {
      // Should have an error message
      expect(result.error.issues[0].message).toBeTruthy()
      expect(result.error.issues[0].message.length).toBeGreaterThan(0)
    }
  })

  it('should provide error messages for string validation', () => {
    const schema = z.object({
      email: z.string().email(),
    })

    const result = schema.safeParse({ email: 'invalid-email' })
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBeTruthy()
    }
  })

  it('should provide error messages for min length', () => {
    const schema = z.string().min(5)

    const result = schema.safeParse('abc')
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBeTruthy()
      expect(result.error.issues[0].code).toBe('too_small')
    }
  })

  it('should provide error messages for max length', () => {
    const schema = z.string().max(3)

    const result = schema.safeParse('abcdef')
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBeTruthy()
      expect(result.error.issues[0].code).toBe('too_big')
    }
  })

  it('should provide error messages for number validation', () => {
    const schema = z.number()

    const result = schema.safeParse('not-a-number')
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBeTruthy()
      expect(result.error.issues[0].code).toBe('invalid_type')
    }
  })

  it('should handle nested object validation errors', () => {
    const schema = z.object({
      user: z.object({
        name: z.string().min(3),
        age: z.number().min(18),
      }),
    })

    const result = schema.safeParse({
      user: {
        name: 'ab',
        age: 15,
      },
    })
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0)
      result.error.issues.forEach(issue => {
        expect(issue.message).toBeTruthy()
      })
    }
  })

  it('should validate successful parsing', () => {
    const schema = z.object({
      name: z.string().min(3),
      age: z.number().min(18),
    })

    const result = schema.safeParse({
      name: 'John Doe',
      age: 25,
    })
    
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('John Doe')
      expect(result.data.age).toBe(25)
    }
  })
})
