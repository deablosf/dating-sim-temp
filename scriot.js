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

// Image and audio asset changerfunctions

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

let darnell = [
    {
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
        text: "You're new here, aren't you? And no has told you anything about me ... Perfect!",
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
                text: "Go to school",
                nextText: 4
            }
        ]
    },
    {
        id: 4,
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
            }
        ]
    }
]

showTextNode(1)