const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema ( 
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            //must be between1-280 char  VARCHAR
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
            //nested documents with the reactionSchema
    },
        
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
);

//virtual reactionCount retires length of reactions
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//create thought model using the thought schema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;