import namor from 'namor';

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const newClass = () => {
    return {
        Id: Math.floor(Math.random() * 100),
        Name: namor.generate({ words: 1, saltLength: 0 }),
        StartDate: randomDate(new Date(2022, 0, 1), new Date(2022, 1, 31)),
        EndDate: randomDate(new Date(2022, 2, 31), new Date(2022, 3, 31)),
        CourseName: namor.generate({ words: 1, saltLength: 0 }),
        TeacherName: namor.generate({ words: 1, saltLength: 0 }),
    }

}
export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...newClass(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}