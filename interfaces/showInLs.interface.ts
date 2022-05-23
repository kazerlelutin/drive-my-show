export interface ShowInLs {
    type: 'reader'|'editor'|'admin';
    token: string
    title: string
}