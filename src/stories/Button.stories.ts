import Button from "@/components/html/Button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "Click me", // Default children for the Button component
  },
};

export default meta;

// @ts-ignore StoryObj type is not assignable to Story
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me", // Children passed to the Button component
  },
};

export const Loading: Story = {
  args: {
    children: "Loading...",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};