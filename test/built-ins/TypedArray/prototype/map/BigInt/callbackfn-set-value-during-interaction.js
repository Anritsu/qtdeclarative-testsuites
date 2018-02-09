// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-%typedarray%.prototype.map
description: >
  Integer indexed values changed during iteration
info: |
  22.2.3.19 %TypedArray%.prototype.map ( callbackfn [ , thisArg ] )
includes: [testBigIntTypedArray.js]
features: [BigInt, Reflect.set, TypedArray]
---*/

testWithBigIntTypedArrayConstructors(function(TA) {
  var sample = new TA(convertToBigInt([42, 43, 44]));
  var newVal = 0;

  sample.map(function(val, i) {
    if (i > 0) {
      assert.sameValue(
        sample[i - 1], convertToBigInt(newVal - 1),
        "get the changed value during the loop"
      );
      assert.sameValue(
        Reflect.set(sample, 0, convertToBigInt(7)),
        true,
        "re-set a value for sample[0]"
      );
    }
    assert.sameValue(
      Reflect.set(sample, i, convertToBigInt(newVal)),
      true,
      "set value during iteration"
    );

    newVal++;
    return convertToBigInt(0);
  });

  assert.sameValue(sample[0], convertToBigInt(7), "changed values after iteration [0] == 7");
  assert.sameValue(sample[1], convertToBigInt(1), "changed values after iteration [1] == 1");
  assert.sameValue(sample[2], convertToBigInt(2), "changed values after iteration [2] == 2");
});
