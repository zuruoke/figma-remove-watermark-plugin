var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log(figma.command);
const selectedNode = figma.currentPage.selection;
const preprocessImage = (node) => __awaiter(this, void 0, void 0, function* () {
    for (const paint of node.fills) {
        if (paint.type === 'IMAGE') {
            // Get the (encoded) bytes for this image.
            const image = figma.getImageByHash(paint.imageHash);
            const bytes = yield image.getBytesAsync();
            return bytes;
        }
    }
});
if (selectedNode.length !== 1) {
    figma.closePlugin("You must select a single node");
}
else {
    const selected = selectedNode[0];
    preprocessImage(selected).then((bytes) => {
        figma.closePlugin(`Watermark Removed: ${bytes}`);
    });
}
