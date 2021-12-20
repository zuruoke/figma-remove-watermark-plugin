console.log(figma.command)
const selectedNode =  figma.currentPage.selection;

const preprocessImage = async (node: { fills: any; }) => {
    for (const paint of node.fills) {
      if (paint.type === 'IMAGE') {
        // Get the (encoded) bytes for this image.
        const image = figma.getImageByHash(paint.imageHash)
        const bytes = await image.getBytesAsync()
        return bytes;
      }
    }
  }

  if (selectedNode.length !== 1){
      figma.closePlugin("You must select a single node");
  }

  else {
    const selected = selectedNode[0] as GeometryMixin
    preprocessImage(selected).then((bytes: any) => {
      figma.closePlugin(`Watermark Removed: ${bytes}`);
    })
  }


  



