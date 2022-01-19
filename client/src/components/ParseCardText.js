import TextManaParser from "./TextManaParser";

const ParseCardText = (text) => {
  let newtext = text.replace(/\n/g, "<p>");
  let newerText = newtext.replace(/f/g, `f`);

  return TextManaParser(newerText);
};

export default ParseCardText;
