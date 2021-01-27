pub struct Resource<'a> {
    pub hash: &'a str,
    pub binary: &'a [u8],
}

pub const ICON: Resource<'static> = Resource {
   hash: "0ff3f6d615b02f5358e83dc5737d3499950bdec2334269005f5aa9b34bdfc17c",
   binary: include_bytes!("../resource/icon.svg")
};