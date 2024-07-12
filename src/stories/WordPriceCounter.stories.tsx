import {Meta, Story} from '@storybook/react';
import WordPriceCounter, {WordPriceCounterProps} from '../app/components/WorldPriceCounter';

export default {
    title: 'Example/WorldPriceCounter',
    component: WordPriceCounter
} as Meta;

const Template: Story<WordPriceCounterProps> = (args) =>
    <div>
        <WordPriceCounter {...args} />
    </div>

export const Default = Template.bind({})
Default.args = {
    pricePerWord: 0.25,
    wordsCount: 20
}