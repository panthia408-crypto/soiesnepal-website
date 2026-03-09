import { defineType, defineField } from "sanity";

export const subscriber = defineType({
  name: "subscriber",
  title: "Email Subscribers",
  type: "document",
  description: "Students who want to be notified about new events.",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "name" },
  },
});
