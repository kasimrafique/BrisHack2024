import { getLAD } from '../app/lib/postcode'
import { expect, test } from 'vitest'

test('postcode', () => {
    expect(getLAD("CM23 2RN")).toBe("E07000242")
    expect(getLAD("CM232RN")).toBe("E07000242")
    expect(getLAD(" CM232 RN ")).toBe("E07000242")
    expect(getLAD("lfdAHSALD")).toBe(null)
})
