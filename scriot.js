// -----HTML ELEMENTS Get List-----

const backGround = document.getElementById("main");
const avatar = document.getElementById("avatar");
const nameTag = document.getElementById("nameTag")
const miniChatter = document.getElementById("miniChatter");
const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('optionsBox')

// ------- STATES of World, Player and NPCs-------

let state = {
    currentRoom: '',
    currentConvo: '',
    brightNess: 100,
    skillFlap: 1,
    itemFlap: 1,
    darnell: 1,
    Chrissy: 2
};

let mainCharacter = {
    name: "",
    age: 0,
    emotions:[
        {
            anger: 0,
            fear: 0,
            sadness: 0,
            boredom: 0,
            joy: 0,
            interest: 0,
            surprise: 0,
            acceptance: 0
        }
    ],
}

let npcDarell = {
    name: "Darnnell",
    age: 20,
    Allure: 0,
    presence: 0,
    empathy: 0,
    appeal: 0,
    recovery: 0,
    tolerance: 0,
    health: 0,
    emotions:[
        {
            anger: 0,
            fear: 0,
            sadness: 0,
            boredom: 0,
            joy: 0,
            interest: 0,
            surprise: 0,
            acceptance: 0
        }
    ],
    commitments: [
        {
            Chrissy: 0
        }
    ]
}

let npcChrissy = {
    name: "Chrissy",
    age: 20,
    Allure: 0,
    presence: 0,
    empathy: 0,
    appeal: 0,
    recovery: 0,
    tolerance: 0,
    health: 0,
    emotions:[
        {
            anger: 0,
            fear: 0,
            sadness: 0,
            boredom: 0,
            joy: 0,
            interest: 0,
            surprise: 0,
            acceptance: 0
        }
    ],
    commitments: [
        {
            darnell: 0
        }
    ]
}

// ------- Image and audio asset changerfunctions--------

const optionsButton = () => {
    alert("Option Button is responding")
    let divBox = document.createElement('div');
    divBox.innerHTML = ("<button id='closeOp' onclick=''>X</button> <button onclick=''>Bright Up</button> <button onclick=''>Bright Down</button>")
};

let backGroundChange = (x) => {
    switch (x) {
        case 0:
            backGround.style.backgroundImage = "none";
            break;
        case 1:
            backGround.style.backgroundImage = "url('/assets/paolo-villavicencio-s03-b01-bg05-color-night.jpg')";
            break;
        case 2:
            backGround.style.backgroundImage = "url('/assets/a5d6f8fdf79594938476aef866c3d69dd2a03bee.jpeg')";
            break;
        case 3:
            backGround.style.backgroundImage = "url('/assets/BG-shop-ext0blayout2finrev1_1340_c.png')";
            break;
        case 4:
            backGround.style.backgroundImage = "url('/assets/wp4720761.jpg')";
            break;
        case 5:
            backGround.style.backgroundImage = "url('/assets/BG-shop-ext1layout2FLATcontrast_1340_c.png')";
            break;
        case 6:
            backGround.style.backgroundImage = "url('/assets/BG-shop-int1layout2flat_1750.png')";
            break;
    }  
}

let avatarChange = (x) => {
    switch (x) {
        case 0:
            avatar.style.backgroundImage = "none";
            nameTag.innerText = ""
            nameTag.classList.remove('chatter')
            break;
        case 1:
            avatar.style.backgroundImage = "url('/assets/download20240102024743.png')";
            nameTag.classList.add('chatter')
            nameTag.innerText = "Darnell"
            break;
    }
}

// ------- Conversation Functions -------

let charConvoNode = (character, convoNodeIndex) => {
    console.log(character.find(convoNode => convoNode.id === convoNodeIndex))
    const convoNode = character.find(convoNode => convoNode.id === convoNodeIndex)
    textElement.innerText = convoNode.text;
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    convoNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => convoOption(option, character))
            optionButtonsElement.appendChild(button)
        }
    })

    if (convoNode.sideEffect) {
        convoNode.sideEffect();
    }
}

const convoOption = (option, character) => {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state.currentConvo = nextTextNodeId;
    state = Object.assign(state, option.setState)
    charConvoNode(character, nextTextNodeId)
}

let convoStart = (x, index) => {
    if (state[x] === 1) {
        charConvoNode(eval(x),index)
    }
}

let endConvo = (character, currentRoom) => {
    state[character] = 2;
    avatarChange(0);
    showTextNode(currentRoom);
    console.log (state[character], currentRoom)
}

// ------- World travelling function -------

let showTextNode = (textNodeIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

    if (textNode.sideEffect) {
        textNode.sideEffect();
    }

}

const showOption = (option) => {
    return option.requiredState == null || option.requiredState(state)
}

const selectOption = (option) => {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state.currentRoom = nextTextNodeId;
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

let darnell = [ {
        id:1,
        text: "Hey there friend.",
        sideEffect: () => {
            avatarChange(1);
        },
        options: [
            {
                text: "Hello?",
                nextText: 2
            },
            {
                text: "I'm not your friend,guy.",
                nextText: 2
            },
            {
                text: "...(silence)",
                nextText: 3
            }
        ]
    },
    {
        id:2,
        text: "You're new here, aren't you? And no one has told you anything about me ... Perfect!",
        sideEffect: () => {

        },
        options: [
            {
                text: "End Conversation",
                nextText: 4
            }
        ]
    },
    {
        id:3,
        text: "o-kay ... (leaves)",
        sideEffect: () => {

        },
        options: [
            {
                text: "End Conversation",
                nextText: 4
            }
        ]
    },
    {
        id:4,
        text: "",
        sideEffect: () => {
            endConvo("darnell", state.currentRoom)
        },
        options: []
    }

]

// ------- World At Large -------

let textNodes = [
    {
        id: 1,
        text: "You awake in your room, not much to do in this place.",
        sideEffect: () => {
            avatarChange(0)
            backGroundChange(1);
        },
        options: [
            {
                text: "Head downstairs",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "Kitchen, stocked with all the things one needs to fight hunger.",
        sideEffect: () => {
            backGroundChange(2);
        },
        options: [
            {
                text: "Go Back to your Room",
                nextText: 1
            },
            {
                text: "Go Outside",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "Outside world ... I dont like it. Better go to school",
        sideEffect: () => {
            backGroundChange(3);
        },
        options: [
            {
                text: "go back home.",
                nextText: 2
            },
            {
                text: "Go to the shops",
                nextText: 4
            },
            {
                text: "Go to school",
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: "The ice cream shop and a small grouping of other family owned stores",
        sideEffect: () => {
            backGroundChange(5);
        },
        options: [
            {
                text: "go back to the main street",
                nextText: 3
            },
            {
                text: "go into Two Scoops",
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: "The smell of frozen sugar and cream! Maybe you have time for taste...",
        sideEffect: () => {
            backGroundChange(6);
        },
        options: [
            {
                text: "leave Two Scoops",
                nextText: 4
            }
        ]
    },
    {
        id: 6,
        text: "In class again, nothing new here.",
        sideEffect: () => {
            backGroundChange(4);
            // x = "darnell"
            convoStart("darnell", 1)
        },
        options: [
            {
                text: "Restart",
                nextText: 1
            },
            {
                text: "Leave the School",
                nextText: 3
            }
        ]
    }
]

showTextNode(1)