import Zombie from "./zombie.js";
import MiniDemon from "./miniDemon.js";
import MoustruoVerde from "./moustruoVerde.js";
import Jinete from "./jinete.js";
import Golem from "./golem.js";

export default class FactoryEnemigos {

    getZombies(contex,enemy,acabar,getPositionTank){
         return new Zombie(contex,enemy.x,enemy.y,enemy.width,enemy.height,getPositionTank,acabar,enemy.direction)
    }

    getMiniDemons(contex,enemy,acabar,getPositionTank){
        return new MiniDemon(contex,enemy.x,enemy.y,enemy.width,enemy.height,getPositionTank,acabar,enemy.direction)
    }

    getMoustruoVerde(contex,enemy,acabar,getPositionTank){
         return new MoustruoVerde(contex,enemy.x,enemy.y,enemy.width,enemy.height,getPositionTank,acabar,enemy.direction)
    }

    getJinete(contex,enemy,acabar,getPositionTank){
          return new Jinete(contex,enemy.x,enemy.y,enemy.width,enemy.height,getPositionTank,acabar,enemy.direction)
    }

    getGolem(contex,enemy,acabar,getPositionTank){
        return new Golem(contex,enemy.x,enemy.y,enemy.width,enemy.height,getPositionTank,acabar,enemy.direction)
    }

    createEnemies(contex,enemies,acabar,getPositionTank){
        let enemigos = []

        enemies.forEach(enemy => {

            switch(enemy.type){
                case "zombie": enemigos.push(this.getZombies(contex,enemy,acabar,getPositionTank))
                    break;
                case "miniDemon":
                    enemigos.push(this.getMiniDemons(contex,enemy,acabar,getPositionTank))
                     break
                case "moustruoVerde":
                    enemigos.push(this.getMoustruoVerde(contex,enemy,acabar,getPositionTank))
                    break
                case "jinete":
                    enemigos.push(this.getJinete(contex,enemy,acabar,getPositionTank))
                    break
                case "golem":
                    enemigos.push(this.getGolem(contex,enemy,acabar,getPositionTank))
                    break

            }


        });
        
        return enemigos;
    }
}