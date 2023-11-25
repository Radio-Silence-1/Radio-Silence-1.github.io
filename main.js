dont={
  name: "dont",
  description: `dont`,
  isFieldTech: false,
  maxCount: 1,
  count: 0,
  frequency: 1,
  frequencyDefault: 200,
  allowed() {
      return true
  },
  requires: "",
  effect() {
      setInterval(function(){
      Matter.Body.setVelocity(player, {
          x: player.velocity.x + 1 * Math.cos(m.angle),
          y: player.velocity.y + 1 * Math.sin(m.angle)
      });
          },1)
  },
  remove() {
      tech.customWIMP = 0
  }
}
eval(tech.tech.push(dont))
