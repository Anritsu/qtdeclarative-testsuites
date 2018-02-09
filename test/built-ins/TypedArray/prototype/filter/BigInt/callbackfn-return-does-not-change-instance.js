// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.filter
description: >
  The callbackfn return does not change the instance
includes: [testBigIntTypedArray.js]
features: [BigInt, TypedArray]
---*/

testWithBigIntTypedArrayConstructors(function(TA) {
  var sample1 = new TA(3);

  sample1[1] = convertToBigInt(1);

  sample1.filter(function() {
    return 42;
  });

  assert.sameValue(sample1[0], convertToBigInt(0), "[0] == 0");
  assert.sameValue(sample1[1], convertToBigInt(1), "[1] == 1");
  assert.sameValue(sample1[2], convertToBigInt(0), "[2] == 0");
});
