
export type State = {
  id?: number
  title:string
  link?:string
  duration?:number
  content: string
  columnist:number
}

const initialState: State = {
  title: '',
  link:undefined,
  duration: undefined,
  content:'',
  columnist:undefined
};

export type Action = {
  type: ActionKind;
  payload: any;
};

enum ActionKind {
  setTitle = 'setTitle',
  setLink = 'setLink',
  setDuration ='setDuration',
  setColumnist = 'setColumnist',
  setContent = 'setContent',
  setReset = 'setReset',
  setChronicle= 'setChronicle'
}

function reducer(state: State, action: Action)  {
  const newState = (oldState: State) => ({
    setTitle: () => {
      oldState.title = action.payload;
      return {...oldState};
    },
    setLink: () => {
      oldState.link = action.payload;
      return {...oldState};
    },
    setDuration: () => {
      oldState.duration = action.payload;
      return {...oldState};
    },
    setColumnist: () => {
      oldState.columnist = action.payload;
      return {...oldState};
    },
    setContent: () => {
      oldState.content = action.payload;
      return {...oldState};
    },
    setReset: () => {
      oldState = {...initialState};
      return {...oldState};
    },
    setChronicle: ()=>{
      const newState = {...action.payload};

      newState.title =action.payload.title;
      newState.link =action.payload?.link;
      newState.duration =action.payload?.duration;
      newState.content =action.payload.content;
      newState.columnist = {
        label: action.payload.columnist.name,
        value: action.payload.columnist.id
      }
      return newState;
    }
  });


  return newState(state)[action.type]();
}

export {
  reducer,
  initialState,
  ActionKind,
}