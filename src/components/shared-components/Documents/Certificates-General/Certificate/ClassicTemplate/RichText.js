import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import redraft from "redraft";
import { StyleSheet, View, Text, Link } from "@react-pdf/renderer";

const RichText = ({ note }) => {
  const renderers = {
    inline: {
      // The key passed here is just an index based on rendering order inside a block
      BOLD: (children, { key }) => {
        return (
          <Text key={`bold-${key}`} style={{ fontWeight: 700 }}>
            {children}
          </Text>
        );
      },
      ITALIC: (children, { key }) => {
        return (
          <Text key={`italic-${key}`} style={{ fontStyle: "italic" }}>
            {children}
          </Text>
        );
      },
      UNDERLINE: (children, { key }) => {
        return (
          <Text
            key={`underline-${key}`}
            style={{ textDecoration: "underline" }}
          >
            {children}
          </Text>
        );
      },
    },
    /**
     * Blocks receive children and depth
     * Note that children are an array of blocks with same styling,
     */
    blocks: {
      unstyled: (children, { keys }) => {
        return children.map((child, index) => {
          return (
            <View key={keys[index]}>
              <Text style={styles.text}>{child}</Text>
            </View>
          );
        });
      },
      "header-one": (children, { keys }) => {
        return children.map((child, index) => {
          return <HeadingOne key={keys[index]}>{child}</HeadingOne>;
        });
      },
      "unordered-list-item": (children, { depth, keys }) => {
        return (
          <UnorderedList key={keys[keys.length - 1]} depth={depth}>
            {children.map((child, index) => (
              <UnorderedListItem key={keys[index]}>{child}</UnorderedListItem>
            ))}
          </UnorderedList>
        );
      },
      "ordered-list-item": (children, { depth, keys }) => {
        return (
          <OrderedList key={keys.join("|")} depth={depth}>
            {children.map((child, index) => (
              <OrderedListItem key={keys[index]} index={index}>
                {child}
              </OrderedListItem>
            ))}
          </OrderedList>
        );
      },
    },
    /**
     * Entities receive children and the entity data
     */
    entities: {
      // key is the entity key value from raw
      LINK: (children, data, { key }) => (
        <Link key={key} src={data.url}>
          {children}
        </Link>
      ),
    },
  };
  const styles = StyleSheet.create({
    headingOne: { textIndent: 30, margin: 13, textAlign: "justify" },
  });
  const HeadingOne = ({ children }) => {
    return (
      <View style={{ textIndent: "15px" }}>
        <Text style={styles.headingOne}>{children}</Text>
      </View>
    );
  };

  const blocksFromHTML = convertFromHTML(note);
  const initialState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const editorState = EditorState.createWithContent(initialState);
  const rawContent = convertToRaw(editorState.getCurrentContent());

  return redraft(rawContent, renderers, { blockFallback: "unstyled" });
};
export default RichText;
