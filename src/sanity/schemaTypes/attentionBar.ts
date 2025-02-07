import { Rule } from '@sanity/types';

const attentionBar = {
  name: 'attentionBar',
  title: 'Attention Bar',
  type: 'document',
  fields: [
    {
      name: 'message',
      title: 'Message',
      type: 'string',
      description: 'Text to display on the attention bar',
      validation: (Rule: Rule) =>
        Rule.required().max(150).warning('Keep the message short!'),
    },
    {
      name: 'url',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link to redirect users when they click the message',
      validation: (Rule: Rule) =>
        Rule.uri({
          allowRelative: true, // Allow relative URLs
          scheme: ['http', 'https'], // Allow only HTTP and HTTPS URLs
        }),
    },
    {
      name: 'isVisible',
      title: 'Visible',
      type: 'boolean',
      description: 'Toggle to show or hide the attention bar',
      initialValue: true,
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description:
        'CSS class or hex code for the background (e.g., "bg-blue-500" or "#ffffff")',
      initialValue: 'bg-blue-500',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'CSS class for the text color (e.g., "text-white" or "text-gray-800")',
      initialValue: 'text-white',
    },
  ],
};

export default attentionBar;