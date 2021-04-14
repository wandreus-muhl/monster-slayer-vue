function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            playerLevel: 1,
            monsterHealth: 100,
            monsterLevel: null,
            round: 0,
            winner: null,
            player: {
                
            },
            monsters: [{
                name: "Agdronnak",
                class: "fire",
                description: "Fogo",
                color: "#F62817"
            }, {
                name: "Girannoth",
                class: "ice",
                description: "Gelo",
                color: "#82EEFD"
            }, {
                name: "Vath'tan",
                class: "light",
                description: "Luz",
                color: "#FDE460"
            }, {
                name: "Vog'ther",
                class: "shadow",
                description: "Sombra",
                color: "#253237",
            }],
            monster: null
        };
    },
    computed: {
        monsterBar() {
            return {
                width: this.monsterHealth + '%',
                background: this.monster.color,
            };
        },
        playerBar() {
            return {
                width: this.playerHealth + '%'
            };
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
                this.playerLevel++;
            }
        },
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.round = 0;
            this.monster = this.monsters[randomValue(0, 4)];
            this.monsterLeveling();
        },
        fireAttack() {
            this.round++;
            if (this.monster.class == 'fire') {
                this.healMonster();
                this.monsterAttack();
            } else if (this.monster.class == 'ice') {
                this.playerAttack(2);
                this.monsterAttack();
            } else {
                this.playerAttack();
                this.monsterAttack();
            }
        },
        iceAttack() {
            this.round++;
            if (this.monster.class == 'ice') {
                this.healMonster();
                this.monsterAttack();
            } else if (this.monster.class == 'light') {
                this.playerAttack(2);
                this.monsterAttack();
            } else {
                this.playerAttack();
                this.monsterAttack();
            }
        },
        lightAttack() {
            this.round++;
            if (this.monster.class == 'light') {
                this.healMonster();
                this.monsterAttack();
            } else if (this.monster.class == 'shadow') {
                this.playerAttack(2);
                this.monsterAttack();
            } else {
                this.playerAttack();
                this.monsterAttack();
            }
        },
        shadowAttack() {
            this.round++;
            if (this.monster.class == 'shadow') {
                this.healMonster();
                this.monsterAttack();
            } else if (this.monster.class == 'fire') {
                this.playerAttack(2);
                this.monsterAttack();
            } else {
                this.playerAttack();
                this.monsterAttack();
            }
        },
        playerAttack(num = 1) {
            const attackValue = Math.floor(randomValue(10, 15) + (this.playerLevel * 0.3));
            this.monsterHealth -= Math.floor((attackValue * num) - (this.monsterLevel * 0.1));
        },
        monsterAttack() { 
            const attackValue = Math.floor(randomValue(10, 20) + (this.monsterLevel * 0.5));
            this.playerHealth -= Math.floor(attackValue - (this.playerLevel * 0.4));
        },
        healPlayer() {
            const healValue = Math.floor(randomValue(10, 20) + (this.playerLevel * 0.3));
            this.playerHealth += healValue;
            this.monsterAttack();
        },
        healMonster() {
            const healValue = Math.floor(randomValue(10, 15) + (this.playerLevel * 0.3));
            this.monsterHealth += healValue;
        },
        surrender() {
            this.winner = 'surrender';
        },
        monsterLeveling() {
            this.monster = this.monsters[randomValue(0, 4)];
            this.monsterLevel = randomValue(this.playerLevel - 2, this.playerLevel + 5); 
        }
    },
    beforeMount() {
        this.monster = this.monsters[randomValue(0, 4)];
        this.monsterLevel = randomValue(this.playerLevel, this.playerLevel + 5); 
    }

});

app.mount('#game');