class Scene extends Phaser.Scene
{
    constructor(name)
    {
        super(name);
    }

    init()
    {
        this.activeEntities = [];
        this.entityMap = new Map();
    }

    addEntity(entity, autoActivate = true)
    {
        this.entityMap.set(entity.getName(),entity);
        if(autoActivate)
            this.activeEntities.push(entity);
    }

    deleteEntity(entity)
    {
        this.deactivateEntity(entity);
    }

    activateEntity(entity)
    {
        var index = activeEntities.indexOf(entity);
        if (index == -1) {
            this.activeEntities.push(entity);
        }
    }

    deactivateEntity(entity)
    {
        var index = this.activeEntities.indexOf(entity);
        if (index > -1) {
            this.activeEntities.splice(index, 1);
        }
    }

    findEntityByName(name)
    {
        return this.entityMap.get(tag);
    }

    start ()
    {
        for(var i = 0; i < this.activeEntities.length; i++ )
            this.activeEntities[i].start();
    }

    update (time, delta)
    {
        for(var i = 0; i < this.activeEntities.length; i++ )
            this.activeEntities[i].update(time,delta);
    }

}

class Component
{
    constructor(entity)
    {
        this.init(entity)
    }

    getEntity()
    {
        return this.entity;
    }

    init(entity)
    {
        this.entity = entity;
    }
}

class Entity
{
    constructor(name,scene)
    {
        this.name = name;
        this.scene = scene;
        this.components = new Map();
        this.activeComponents = [];
    }

    getScene()
    {
        return this.scene;
    }

    getName()
    {
        return this.name;
    }

    addComponent(component, autoActivate = true)
    {
        if(component == undefined)
            console.error("Error, el componente debe estar definido");
        this.components.set(component.constructor.name,component);
        if(autoActivate)
            this.activeComponents.push(component);
    }

    getComponent(name)
    {
        return this.components.get(name);
    }

    start()
    {
        for(var i = 0; i < this.activeComponents.length; i++)
            this.activeComponents[i].start();
    }

    update(time,delta)
    {
        for(var i = 0; i < this.activeComponents.length; i++)
            this.activeComponents[i].update(time,delta);
    }

    sendMessage(sender, msg, argm, checkReception = false)
    {
        let count = 0;
        if (this.trySendMessage(this, sender, msg, argm))
            ++count;
        for(var i = 0; i < this.activeComponents.length; i++)
        {
            if (this.trySendMessage(this.activeComponents[i], sender, msg, argm))
                ++count;
        }
        if(checkReception && count == 0)
            console.error("Nobody heard the message " + msg);
    }

    trySendMessage(receiver, sender, msg, argm)
    {
        let fun = receiver[msg];
        if (fun != undefined) 
        { 
            fun.call(receiver, sender, argm);
            return true;
        }
        return false;
    }
}

class SpriteRender extends Phaser.Physics.Arcade.Sprite
{
    constructor(entity,x,y,spriteName)
    {
        super(entity.getScene(),x,y,spriteName);
        this.componentInit(entity);
        this.entity.getScene().add.existing(this);
    }

    start(){}
    update(time,delta){}
}

SpriteRender.prototype.getEntity = Component.prototype.getEntity;
SpriteRender.prototype.componentInit = Component.prototype.init;


class RigidBody extends Component
{
    constructor(entity,gravity,ftype)
    {
        super(entity);
        this.gravity = gravity;
        this.ftype = ftype;
        
    }

    setPhysicType(ftype)
    {
        this.sprite.sprite.body.physicsType = ftype;
    }

    allowGravity(gravity)
    {
        this.sprite.body.allowGravity = gravity;
    }

    start()
    {
        this.sprite = this.entity.getComponent('SpriteRender');
        this.entity.getScene().physics.add.existing(this.sprite);
        if(this.gravity != undefined)
            this.sprite.body.allowGravity = this.gravity;
        if(this.ftype != undefined)
            this.sprite.body.physicsType = this.ftype;
    }

    update(time,delta){}
}