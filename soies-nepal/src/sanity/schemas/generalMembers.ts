import { defineType, defineField } from "sanity";

export const generalMembers = defineType({
  name: "generalMembers",
  title: "General Members",
  type: "document",
  description: "Batch-wise list of general members with roll numbers.",
  fields: [
    defineField({
      name: "batch",
      title: "Batch (e.g. 079)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rollNumber",
              title: "Roll Number (just the number, e.g. 4)",
              type: "number",
              description: "Only the roll number. Full format THA{batch}BIE0{number} is generated automatically.",
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "name", roll: "rollNumber" },
            prepare({ title, roll }) {
              return { title, subtitle: `Roll: ${roll}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "batch" },
    prepare({ title }) {
      return { title: `Batch ${title}` };
    },
  },
});
