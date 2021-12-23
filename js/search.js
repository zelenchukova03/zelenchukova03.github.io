import {Node} from './node.js'
import {Agenda} from './agenda.js'
import {Explored} from './explored.js'

let n_nodes = 0

export function search(initialState, goalTest, actions, successor, print = true)
{
    const agenda = new Agenda()
    const explored = new Explored()
    const initialNode = new Node(null, initialState, null)
    agenda.add(initialNode)
    while(agenda.notEmpty())
    {
        const parent = agenda.getNode()
        if(goalTest(parent.state))
        {
            n_nodes++
            return parent.path()
        }
        else
        {
            n_nodes++
        }


        explored.add(parent.state)
        for(const action of actions(parent.state))
        {
            const newS = successor(parent.state, action)
            const newN = new Node(action, newS, parent)
            if(!explored.hasState(newS))
            {
                agenda.add(newN)
            }
        }
    }
    return null
}
