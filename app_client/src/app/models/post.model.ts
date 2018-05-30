export class Post {
    constructor(
        public _id = "",
        public title = "",
        public description = "",
        public display = false,
        public editable = false
    ) {}
}