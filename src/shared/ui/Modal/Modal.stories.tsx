import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

const meta = {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isOpen: true,
        children: 'Text dsadad asdsadas sadada sadadad',
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Text dsadad asdsadas sadada sadadad',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
