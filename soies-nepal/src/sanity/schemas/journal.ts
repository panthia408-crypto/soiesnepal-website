import { defineType, defineField } from "sanity";

export const journal = defineType({
  name: "journal",
  title: "Journal",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "volume",
      title: "Volume",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issueNumber",
      title: "Issue Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publicationDate",
      title: "Publication Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resources",
      title: "PDF File",
      type: "file",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
