export type MessageType = {
    id: number,
    type: 'text',
    content: any,
    from: number,
    to: number,
    created_at: Date,
    updated_at: Date,
}