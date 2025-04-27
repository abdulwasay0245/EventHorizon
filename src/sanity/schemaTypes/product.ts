import { defineType } from "sanity"

export const product = defineType(
    {
        name: 'product',
        title: 'Product',
        type: 'document',
        fields: [
            {
                name: 'createdAt',
                title: 'Created At',
                type: 'datetime',
                description: 'Date when the product was created.',
                validation: Rule => Rule.required(),
            },
            {
                name: 'name',
                title: 'Product Name',
                type: 'string',
                description: 'Name of the product.',
                validation: Rule => Rule.required().min(1).max(100),
            },
            {
                name: 'image',
                title: 'Product Image',
                type: 'image',
                options: {
                    hotspot: true,  // Enable cropping and focus features for images
                },
                description: 'Image of the product.',
                validation: Rule => Rule.required(),
            },
            {
                name: 'price',
                title: 'Price',
                type: 'number',
                description: 'Price of the product.',
                validation: Rule => Rule.required().min(0),
            },
            {
                name: 'category',
                title: 'Category',
                type: 'string',
                description: 'Category of the product (e.g., event, electronics, etc.).',
                validation: Rule => Rule.required().min(1).max(50),
            },
            {
                name: 'isNew',
                title: 'Is New?',
                type: 'boolean',
                description: 'Indicates if the product is new or not.',
                validation: Rule => Rule.required(),
            },
            {
                name: 'quantity',
                title: 'Quantity Available',
                type: 'number',
                description: 'The amount of product available in stock.',
                validation: Rule => Rule.required().min(0),
            },
            {
                name: 'isAvailable',
                title: 'Availability',
                type: 'boolean',
                description: 'Indicates if the product is available for sale.',
                validation: Rule => Rule.required(),
            },
            {
                name: 'description',
                title: 'Description',
                type: 'text',
                description: 'A brief description of the product.',
                validation: Rule => Rule.required().min(10).max(500),
            },
            {
                name: 'id',
                title: 'Product ID',
                type: 'string',
                description: 'Unique identifier for the product.',
                validation: Rule => Rule.required().min(1).max(50),
            },
        ],
    }

)