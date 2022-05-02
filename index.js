const Discord = require('discord.js')

const client = new Discord.Client()

const config = require('./config.json')

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`)
})

client.on("messageCreate", async message => {

    let args = message.content.slice(config.prefix.length).trim().split(/ +/)
    let command = args.shift().toLowerCase()


    let questions = {
        firstQuestion: "First Question!",
        secondQuestion: "Second Question!",
        thirdQuestion: "Third Question!",
        fourthQuestion: "Fourth Question!",
        fifthQuestion: "Fifth Question!",
    }


    if (!message.content.startsWith(config.prefix) || message.author.bot) return
    if (command === "apply") {
        message.channel.send({ content: "I have started this process in your DM's. Type `cancel` to cancel" })
        message.author.send({ embeds: [questions.firstQuestion] }).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if(msg1.toLowerCase() === "cancel") return message.author.send({ content: "Ok, I have cancelled this process" })
                message.author.send({ embeds: [questions.secondQuestion] }).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if(msg2.toLowerCase() === "cancel") return message.author.send({ content: "Ok, I have cancelled this process" })
                        message.author.send({ embeds: [questions.thirdQuestion] }).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if(msg3.toLowerCase() === "cancel") return message.author.send({ content: "Ok, I have cancelled this process" })
                                message.author.send({ embeds: [questions.fourthQuestion] }).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if(msg4.toLowerCase() === "cancel") return message.author.send({ content: "Ok, I have cancelled this process" })
                                        message.author.send({ embeds: [questions.fifthQuestion] }).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if(msg5.toLowerCase() === "cancel") return message.author.send({ content: "Ok, I have cancelled this process" })
                                                message.author.send({ content: "Subbmitted application!" }).then(msg => {
                                                    message.client.channels.cache.get(config.applicationChannel).send(
                                                        new Discord.MessageEmbed()
                                                            .setTitle('Application Submitted')
                                                            .setDescription(`This application was submitted by ${message.author.tag} (${message.author.id}).\nCreated: ${message.author.createdAt}`)
                                                            .addField(questions.firstQuestion, "Answer: " + msg1)
                                                            .addField(questions.secondQuestion, "Answer: " + msg2)
                                                            .addField(questions.thirdQuestion, "Answer: " + msg3)
                                                            .addField(questions.fourthQuestion, "Answer: " + msg4)
                                                            .addField(questions.fifthQuestion, "Answer: " + msg5)
                                                    )
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    if(command === "decline"){
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "you dont' have permission to use this command" })
        let User = message.mentions.users.first()
        if(!User) return message.channel.send({ content: "Please provide a user for me to decline" })
        User.send({ content: "Your application to " + message.guild.name + " got declined by: " + message.author.tag })
    }

    if(command === "accept"){
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "you dont' have permission to use this command" })
        let User = message.mentions.users.first()
        if(!User) return message.channel.send({ content: "Please provide a user for me to accept" })
        User.send({ content: ":tada: Your application to " + message.guild.name + " got accepted by: " + message.author.tag })
    }
})

client.login(config.token)  
