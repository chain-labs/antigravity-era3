import Table from "@/components/html/Table";
import { Meta } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
  title: "Table",
  component: Table,
  tags: ["dev"],
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  args: {},
} satisfies Meta<typeof Table>;

export default meta;

export const Default = {
  args: {
    header: ["Name", "Age"],
    body: [
      ["John", 20],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
      ["Doe", 30],
    ],
  },
};
