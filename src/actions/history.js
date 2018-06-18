import uuid from 'uuid';


//ADD RECORD 

export const addRecord = ({url = '', name = '', createdAt = 0, type= ''} = {}) => ({
type: 'ADD',
record: {
    id: uuid(),
    type,
    url,
    name,
    createdAt
}
});

//REMOVE

export const removeRecord = ({id = ''} = {}) => ({
    type: 'REMOVE',
    id
});