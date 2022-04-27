const DraftToHtml = (data) => {
  let content = data?.content;
  let numberRow = content?.blocks.length - 1;
  let container;
  let inlineStyle;
  let dynamicDiv = [];
  let type = "span";
  container = `<${type} style="text-align: justify;text-indent: 50px; line-height: 16px;">`;
  // console.log(inlineStyle?.filter((set) => set.offset == 3));
  for (var k = 0; k <= numberRow; k++) {
    container += `<${type} > <br/>`;

    for (var i = 0; i <= content?.blocks[k].text.length; i++) {
      inlineStyle = content?.blocks[k].inlineStyleRanges;
      if (content?.blocks[k].text[i]) {
        //Start of InlineStyle
        if (inlineStyle?.filter((set) => set.offset == i)) {
          const data = inlineStyle?.filter((set) => set.offset == i);
          if (data.length >= 1) {
            dynamicDiv.push({ key: i, length: Number(data[0]?.length) });

            container += `<${type} id="!" style="text-indent: 50px;`;
            //Multiple Style
            for (var s = 0; s < data.length; s++) {
              if (data[s]?.style.includes("font-family")) {
              } else {
                if (data[s]?.style == "BOLD") {
                  container += `font-weight: 700;`;
                  //Continue this
                } else if (data[s]?.style == "ITALIC") {
                  container += `font-style: italic;`;
                }
              }
            }
            container += '">';
          }
        }
        // Character Output
        container += `${content?.blocks[k].text[i]}`;
        // End of InlineStyle
        for (var a = 0; a < dynamicDiv.length; a++) {
          dynamicDiv[a].length = dynamicDiv[a]?.length - 1;
          if (dynamicDiv[a]?.length == 0) {
            container += `</${type}>`;
          }
        }
      }
      //  console.log(content?.blocks[k].text[i]);
    }
    container += `<br /></${type}>`;
  }
  container += `</${type}>`;
  return container;
};
export default DraftToHtml;
