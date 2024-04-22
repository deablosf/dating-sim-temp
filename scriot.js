// -----HTML ELEMENTS Get List-----
//---------

const body = document.getElementById("body")
const backGround = document.getElementById("main");
const avatar = document.getElementById("avatar");
const miniAvatar = document.getElementById("miniAvatar")
const nameTag = document.getElementById("nameTag");
const miniChatter = document.getElementById("miniChatter");
const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('optionsBox');

// ------------
// ------- STATES of World, Player and NPCs-------
//-------------

let state = {
    currentRoom: '',
    currentConvo: '',
    brightNess: 100,
    day: 1,
    act: 1,
    uteki: 1,
    chrissy: 2
};

let mainCharacter = {
    name: "Xavi",
    age: 0,
    Allure: 0,
    presence: 0,
    empathy: 0,
    appeal: 0,
    recovery: 0,
    tolerance: 0,
    health: 0,
    resolve: 0,
    emotions:[
    ],
    commitments: []
}

let npcDarnell = {
    name: "Darnell",
    age: 20,
    Allure: 0,
    presence: 0,
    empathy: 0,
    appeal: 0,
    recovery: 0,
    tolerance: 0,
    health: 0,
    resolve: 0,
    currentLocation: "",
    favorateLocations: ["Class", "Mall", "Malt Shop", "Park"],
    conversed: [],
    emotions:[
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
    resolve: 0,
    currentLocation: "",
    favorateLocations: ["Class", "Mall", "Malt Shop", "Park"],
    conversed: [],
    emotions:[
    ],
    commitments: [
        {
            darnell: 0
        }
    ]
}

let cast = [mainCharacter, npcChrissy, npcDarnell];

let npcCast = [npcChrissy, npcDarnell]

let emotionalHealing = () => {
    cast.forEach(member => {
        if (member.emotions.length > 0) {
            console.log(member.emotions)
            member.emotions.forEach(feeling => {
                console.log(feeling)
                feeling.level -= 1;
                if (feeling.level <= 0) {
                   member.emotions = member.emotions.filter(people => people.resip != [feeling.resip])
                }
                console.log(member)
            })
        }
        
    });
}

let relocate = () => {
    npcCast.forEach(member => {
        member.currentLocation = member.favorateLocations[Math.floor(Math.random() * member.favorateLocations.length)]
    });
}

let dayShift = () => {
    emotionalHealing();
    relocate();
    state.day += 1;
    avatar.innerText = "DAY " + state.day;
    setTimeout(()=> {
        avatar.innerText = "";
     }
     ,3000);
}

let actShift = () => {
    if (state.act < 3){
        state.act += 1
    } else {
        console.log("You're too tired")
    }
}

let localCheck = () => {
	npcCast.forEach(member => {
  	npcCast.forEach(target => {
    if (member.name != target.name){
    	console.log(member.currentLocation + " " + target.currentLocation)
    }
    })
  })
}



// ----------
// ------- Image and audio asset changer functions--------

const optionsButton = () => {
    alert("Option Button is responding")
    let divBox = document.createElement('div');
    divBox.innerHTML = ("<button id='closeOp' onclick=''>X</button> <button onclick=''>Bright Up</button> <button onclick=''>Bright Down</button>")
};

let theBed = document.createElement("div");
theBed.className = "bed";
theBed.setAttribute("id", "bed")
theBed.setAttribute("onclick", "dayShift()")

let killBed = () => {
    const killer = document.getElementById("bed");
    killer.remove()
}

let backGroundChange = (x) => {
    switch (x) {
        case 0:
            backGround.style.backgroundImage = "none";
            break;
        case 1:
            backGround.style.backgroundImage = "url('/assets/paolo-villavicencio-s03-b01-bg05-color-night.jpg')";
            backGround.insertBefore(theBed, backGround.firstChild)
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
            avatar.style.backgroundImage = "url('/assets/Uteki_main.png')";
            nameTag.classList.add('chatter')
            nameTag.innerText = "Uteki"
            break;
        case 2:
            avatar.style.backgroundImage = "url('')"
            nameTag.classList.add('chatter')
            nameTag.innerText = "Chrissy"
            break;
    }
}

let miniAvatarChange = (x) => {
    switch (x) {
        case 0:
            miniAvatar.className = ""
            miniChatter.innerText = "";
            miniChatter.classList.remove('miniChatter');
            break;
        case 1:
            miniAvatarChange(0)
            miniAvatar.classList.add('miniAvatarXavi');
            miniChatter.innerText = "Xavi";
            miniChatter.classList.add('miniChatter');
            break;
        case 2:
            miniAvatarChange(0)
            miniAvatar.classList.add('miniAvatarTawfiq');
            miniChatter.innerText = "Tawfiq";
            miniChatter.classList.add('miniChatter');
            break;
        case 3:
            miniAvatarChange(0);
            miniAvatar.classList.add('miniAvatarSign');
            miniChatter.innerText = "Uteki";
            miniChatter.classList.add('miniChatter');

    }
}


// ----------------
// ------- SOCIAL ACTIONS ------

const instillEmotion = (target, noun, feeling) => {
    if (cast[target].emotions.length <= 0) {
        target.emotions.push({resip: noun.name, emotion: feeling, level: 1})
    }
};



// --------------
// ------- Conversation Functions -------
// --------------

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

//----------
// ------- World travelling function -------
//----------

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

let uteki = [ {
        id:1,
        text: ". . .",
        sideEffect: () => {
            avatarChange(1);
        },
        options: [
            {
                text: "Uteki, right?",
                nextText: 2
            }
        ]
    },
    {
        id:2,
        text: "Uteki,correct? I am aware you need assistance. Your snake helps you?",
        sideEffect: () => {
            miniAvatarChange(1)
        },
        options: [
            {
                text: ". . .",
                nextText: 3
            }
        ]
    },
    {
        id:3,
        text: "I do, he can use sign though if you would prefer.",
        sideEffect: () => {
            miniAvatarChange(2)
        },
        options: [
            {
                text: ". . .",
                nextText: 4
            }
        ]
    },
    {
        id:4,
        text: "Whatever he feels comfortable with, I want all students to feel safe.",
        sideEffect: () => {
            miniAvatarChange(1)
        },
        options: [
            {
                text: ". . . ",
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: "Uteki, signs: Thank you, Sensei",
        sideEffect: () => {
            miniAvatarChange(3)
        },
        options: [
            {
                text: ". . .",
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: "",
        sideEffect: () => {
            miniAvatarChange(0)
            endConvo("uteki", state.currentRoom)
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
            killBed()
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
            convoStart("uteki", 1)
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