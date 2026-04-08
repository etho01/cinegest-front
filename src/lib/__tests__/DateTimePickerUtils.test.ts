import {
  dateToCalendarDateTime,
  dateToCalendarDate,
  calendarToDate,
  isoStringToCalendarDateTime,
  isoStringToCalendarDate,
  formatDateValue,
  now,
  today,
  dateValueToDate,
  createSafeDateValue,
} from '../DateTimePickerUtils'
import { CalendarDate, CalendarDateTime, ZonedDateTime } from '@internationalized/date'

describe('DateTimePickerUtils', () => {
  describe('dateToCalendarDateTime', () => {
    it('should convert Date to CalendarDateTime', () => {
      const date = new Date(2024, 0, 15, 14, 30, 45) // 15 Jan 2024 14:30:45
      const result = dateToCalendarDateTime(date)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(1)
      expect(result.day).toBe(15)
      expect(result.hour).toBe(14)
      expect(result.minute).toBe(30)
      expect(result.second).toBe(45)
    })

    it('should handle midnight correctly', () => {
      const date = new Date(2024, 5, 10, 0, 0, 0)
      const result = dateToCalendarDateTime(date)

      expect(result.hour).toBe(0)
      expect(result.minute).toBe(0)
      expect(result.second).toBe(0)
    })

    it('should handle end of day correctly', () => {
      const date = new Date(2024, 11, 31, 23, 59, 59)
      const result = dateToCalendarDateTime(date)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(12)
      expect(result.day).toBe(31)
      expect(result.hour).toBe(23)
      expect(result.minute).toBe(59)
      expect(result.second).toBe(59)
    })
  })

  describe('dateToCalendarDate', () => {
    it('should convert Date to CalendarDate without time', () => {
      const date = new Date(2024, 2, 20, 14, 30, 45)
      const result = dateToCalendarDate(date)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(3)
      expect(result.day).toBe(20)
      expect('hour' in result).toBe(false)
    })

    it('should ignore time portion', () => {
      const date = new Date(2024, 6, 4, 23, 59, 59)
      const result = dateToCalendarDate(date)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(7)
      expect(result.day).toBe(4)
    })
  })

  describe('calendarToDate', () => {
    it('should convert CalendarDateTime to Date', () => {
      const calendar = new CalendarDateTime(2024, 5, 10, 16, 45, 30)
      const result = calendarToDate(calendar)

      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(4) // May is month 4 (0-indexed)
      expect(result.getDate()).toBe(10)
      expect(result.getHours()).toBe(16)
      expect(result.getMinutes()).toBe(45)
      expect(result.getSeconds()).toBe(30)
    })

    it('should convert CalendarDate to Date at midnight', () => {
      const calendar = new CalendarDate(2024, 8, 25)
      const result = calendarToDate(calendar)

      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(7) // August is month 7
      expect(result.getDate()).toBe(25)
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
    })

    it('should throw error for null value', () => {
      expect(() => calendarToDate(null)).toThrow('calendarToDate: calendar value is null')
    })
  })

  describe('isoStringToCalendarDateTime', () => {
    it('should parse ISO string to CalendarDateTime', () => {
      const isoString = '2024-03-15T14:30:00'
      const result = isoStringToCalendarDateTime(isoString)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(3)
      expect(result.day).toBe(15)
      expect(result.hour).toBe(14)
      expect(result.minute).toBe(30)
      expect(result.second).toBe(0)
    })

    it('should handle ISO string with timezone info', () => {
      const isoString = '2024-06-20T10:15:30Z'
      const result = isoStringToCalendarDateTime(isoString)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(6)
      expect(result.day).toBe(20)
      expect(result.hour).toBe(10)
      expect(result.minute).toBe(15)
    })
  })

  describe('isoStringToCalendarDate', () => {
    it('should parse ISO date string to CalendarDate', () => {
      const isoString = '2024-07-04'
      const result = isoStringToCalendarDate(isoString)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(7)
      expect(result.day).toBe(4)
    })

    it('should extract date from full ISO datetime string', () => {
      const isoString = '2024-12-25T23:59:59Z'
      const result = isoStringToCalendarDate(isoString)

      expect(result.year).toBe(2024)
      expect(result.month).toBe(12)
      expect(result.day).toBe(25)
    })
  })

  describe('formatDateValue', () => {
    it('should format CalendarDateTime with time', () => {
      const dateTime = new CalendarDateTime(2024, 1, 15, 14, 30)
      const result = formatDateValue(dateTime, 'fr-FR')

      expect(result).toContain('2024')
      expect(result).toContain('01')
      expect(result).toContain('15')
      expect(result).toContain('14')
      expect(result).toContain('30')
    })

    it('should format CalendarDate without time', () => {
      const date = new CalendarDate(2024, 3, 20)
      const result = formatDateValue(date, 'fr-FR')

      expect(result).toContain('2024')
      expect(result).toContain('03')
      expect(result).toContain('20')
    })

    it('should return empty string for null', () => {
      const result = formatDateValue(null)
      expect(result).toBe('')
    })

    it('should use default locale when not specified', () => {
      const date = new CalendarDate(2024, 5, 10)
      const result = formatDateValue(date)

      expect(result).toBeTruthy()
      expect(result).toContain('2024')
    })
  })

  describe('now', () => {
    it('should return current date and time', () => {
      const before = new Date()
      const result = now()
      const after = new Date()

      expect(result.year).toBe(before.getFullYear())
      expect(result.month).toBe(before.getMonth() + 1)
      expect(result.day).toBe(before.getDate())

      // Hour should be close to current hour (allowing for test execution time)
      expect([before.getHours(), after.getHours()]).toContain(result.hour)
    })
  })

  describe('today', () => {
    it('should return current date without time', () => {
      const current = new Date()
      const result = today()

      expect(result.year).toBe(current.getFullYear())
      expect(result.month).toBe(current.getMonth() + 1)
      expect(result.day).toBe(current.getDate())
      expect('hour' in result).toBe(false)
    })
  })

  describe('dateValueToDate', () => {
    it('should convert CalendarDateTime to Date', () => {
      const calendar = new CalendarDateTime(2024, 6, 15, 10, 30, 0)
      const result = dateValueToDate(calendar)

      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(5)
      expect(result.getDate()).toBe(15)
      expect(result.getHours()).toBe(10)
      expect(result.getMinutes()).toBe(30)
    })

    it('should convert CalendarDate to Date', () => {
      const calendar = new CalendarDate(2024, 9, 20)
      const result = dateValueToDate(calendar)

      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(8)
      expect(result.getDate()).toBe(20)
    })

    it('should throw error for null value', () => {
      expect(() => dateValueToDate(null)).toThrow('dateValueToDate: dateValue is null')
    })
  })

  describe('createSafeDateValue', () => {
    it('should create CalendarDate for day granularity', () => {
      const date = new Date(2024, 4, 10, 14, 30, 0)
      const result = createSafeDateValue(date, 'day')

      expect(result).toBeInstanceOf(CalendarDate)
      expect(result?.year).toBe(2024)
      expect(result?.month).toBe(5)
      expect(result?.day).toBe(10)
    })

    it('should create ZonedDateTime for minute granularity', () => {
      const date = new Date(2024, 7, 15, 16, 45, 0)
      const result = createSafeDateValue(date, 'minute')

      expect(result).toBeInstanceOf(ZonedDateTime)
      expect(result?.year).toBe(2024)
      expect(result?.month).toBe(8)
      expect(result?.day).toBe(15)
    })

    it('should use minute as default granularity', () => {
      const date = new Date(2024, 11, 25, 12, 0, 0)
      const result = createSafeDateValue(date)

      expect(result).toBeInstanceOf(ZonedDateTime)
    })
  })

  describe('round-trip conversions', () => {
    it('should preserve date through Date -> CalendarDateTime -> Date', () => {
      const original = new Date(2024, 3, 15, 10, 30, 45)
      const calendar = dateToCalendarDateTime(original)
      const result = calendarToDate(calendar)

      expect(result.getFullYear()).toBe(original.getFullYear())
      expect(result.getMonth()).toBe(original.getMonth())
      expect(result.getDate()).toBe(original.getDate())
      expect(result.getHours()).toBe(original.getHours())
      expect(result.getMinutes()).toBe(original.getMinutes())
      expect(result.getSeconds()).toBe(original.getSeconds())
    })

    it('should preserve date through Date -> CalendarDate -> Date', () => {
      const original = new Date(2024, 8, 20, 14, 0, 0)
      const calendar = dateToCalendarDate(original)
      const result = calendarToDate(calendar)

      expect(result.getFullYear()).toBe(original.getFullYear())
      expect(result.getMonth()).toBe(original.getMonth())
      expect(result.getDate()).toBe(original.getDate())
    })
  })
})
