class CollisionBlock{
    constructor({position,width= 16,height = 16}){
        this.position = position
        this.width = width
        this.height = height
    }
    draw(){
        ctx.fillStyle = "#ff000088"
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        if(debugMode)this.draw()
    }
}