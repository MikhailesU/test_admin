import { faker } from "@faker-js/faker"
export const Change_password = (iter: number) => {
    const db = []
    for (let x: number = 0; x <= iter; x++) {
        db.push({ name: faker.system.commonFileName() })
    }
    return (<ul>
        {db.map((e) => <li key={e.name}>{e.name}</li>)}
    </ul>)
}