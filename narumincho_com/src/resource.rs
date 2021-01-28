pub struct Resource<'a> {
    pub hash: &'a str,
    pub binary: &'a [u8],
}

pub const ALCOHOL_LAMP: Resource<'static> = Resource {
   hash: "d60ac3c6a8c43ceeb5f0b59cf8d0c725431a6521593c3a853f0d8fa194cfc040",
   binary: include_bytes!("../resource/alcohol_lamp.jpg")
};
pub const ICON: Resource<'static> = Resource {
   hash: "0ff3f6d615b02f5358e83dc5737d3499950bdec2334269005f5aa9b34bdfc17c",
   binary: include_bytes!("../resource/icon.svg")
};