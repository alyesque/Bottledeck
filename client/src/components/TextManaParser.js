import parseColor from "./ParseColors";

function TextManaParser(x) {
  const showManaCost = (cost) => {
    if (cost !== undefined) {
      return `<img class="mana" src=${parseColor(cost)} alt="" />`;
    }
  };

  if (x !== undefined) {
    //Creates an empty array to store the coordinates of the opening brackets//
    //Loop through the X string to find the coordinates of the opening brackets and push to array//
    var OB = [];
    for (var i = 0; i < x.length; i++) {
      if (x[i] === "{") OB.push(i);
    }

    //Creates an empty array to store the coordinates of the closing brackets//
    //Loop through the X string to find the coordinates of the closing brackets and push to array//
    var CB = [];
    for (var e = 0; e < x.length; e++) {
      if (x[e] === "}") CB.push(e);
    }

    // Creates a new array to store the output mana values as sweparate array entries//
    // Uses coordinates from OB and CB arrays to push substrings of the X string to the new array//
    let newstring = x;
    let array = [];
    for (var a = 0; a < OB.length; a++) {
      array.push(newstring.substring(OB[a], CB[a] + 1));
    }

    for (var i = 0; i < array.length; i++) {
      newstring = newstring.replace(array[i], showManaCost(array[i]));
    }

    return newstring;
  } else {
    return [];
  }
}

export default TextManaParser;
