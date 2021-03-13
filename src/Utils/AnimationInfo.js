class AnimationInfo
{
    constructor(spritesheetKey, key, prefix, frameRate, loop, startIndex, endIndex)
    {
        this.spritesheetKey = spritesheetKey;
        this.key = key;
        this.prefix = prefix;
        this.frameRate = frameRate;
        this.loop = loop;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }

    createFor(sprite, scene)
    {
        sprite.anims.create({
            key: this.key,
            frames: scene.anims.generateFrameNames(this.spritesheetKey, { start: this.startIndex, end: this.endIndex, prefix: this.prefix }),
            frameRate: this.frameRate,
            repeat: this.loop ? -1 : 0
        });
    }

    playFor(sprite)
    {
        sprite.play(this.key, true);
    }
}