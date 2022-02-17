const pdfjsLib = require("pdfjs-dist")
const path = require("path")

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, "../../dist/pdf.worker.bundle.js")
export class DocumentPreviewController{
    constructor(file){
        this._fileEl = file
    }

    getPreviewData(){
        return new Promise((s, f)=>{
            let reader = new FileReader()

            switch(this._fileEl.type){
                case "image/png":
                case "image/jpg":
                case "image/jpeg":
                case "image/gif":
                    reader.onload = e=>{
                        s({
                            src: reader.result,
                            info: this._fileEl.name
                        })
                    }

                    reader.onerror = e=>{
                        f(e)
                    }

                    reader.readAsDataURL(this._fileEl)
                break

                case "application/pdf":
                    console.log("entrou")
                    reader.onload = e=>{
                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf=>{
                            pdf.getPage(1).then(page=>{
                                let viewport = page.getViewport(1)
                                let canvas = document.createElement("canvas")
                                let canvasContext = canvas.getContext("2d")

                                canvas.width = viewport.width
                                canvas.height = viewport.height

                                page.render({
                                    canvasContext,
                                    viewport
                                }).then(()=>{
                                    let _s = (pdf.numPages > 1) ? "s" : ""
                                    s({
                                        src: canvas.toDataURL("image/png"),
                                        info: `${pdf.numPages} página${_s}`
                                    })
                                }).catch(e=>{
                                    f(e)
                                })

                            }).catch(e=>{
                                f(e)
                            })
                        }).catch(e=>{
                            f(e)
                        })
                    }

                    reader.onerror = e=>{
                        f(e)
                    }

                    reader.readAsArrayBuffer(this._fileEl)
                break

                case "default":
                    f()
                break
            }
        })
    }
}