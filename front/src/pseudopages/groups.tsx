import { faker } from "@faker-js/faker"
export const Groups = (iter: number) => {
    const db = []
    for (let x: number = 0; x <= iter; x++) {
        db.push({ name: faker.company.name() })
    }
    return (<ul>
        {db.map((e) => <li key={e.name}>{e.name}</li>)}
    </ul>)
}