class WhatsAppController{
    constructor(){
        console.log("OK")
        this.loadElements()
        this.el
    }

    loadElements(){
        this.el = {}

        document.querySelectorAll("[id]").forEach(element=>{
            this.el[Format.getCamelCase(element.id)] = element
        })
    }
}