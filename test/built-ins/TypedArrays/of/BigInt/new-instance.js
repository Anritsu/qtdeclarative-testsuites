// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.of
description: >
  Return a new TypedArray
info: |
  9.4.5.5 [[Set]] ( P, V, Receiver)

  ...
  2. If Type(P) is String and if SameValue(O, Receiver) is true, then
    a. Let numericIndex be ! CanonicalNumericIndexString(P).
    b. If numericIndex is not undefined, then
      i. Return ? IntegerIndexedElementSet(O, numericIndex, V).
  ...

  9.4.5.9 IntegerIndexedElementSet ( O, index, value )

  ...
  3. Let numValue be ? ToNumber(value).
  ...
includes: [testBigIntTypedArray.js]
features: [BigInt, TypedArray]
---*/

testWithTypedArrayConstructors(function(TA) {
  var result = TA.of(convertToBigInt(42), convertToBigInt(43), convertToBigInt(false));
  assert.sameValue(result.length, 3);
  assert.sameValue(result[0], convertToBigInt(42));
  assert.sameValue(result[1], convertToBigInt(43));
  assert.sameValue(result[2], convertToBigInt(0));
  assert.sameValue(result.constructor, TA);
  assert.sameValue(Object.getPrototypeOf(result), TA.prototype);
});
