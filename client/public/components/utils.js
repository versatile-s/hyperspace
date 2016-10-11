
export function sum(node) {
    if (node.children && node.children.length) {
        let d = 0,
            i = -1,
            n = node.children.length;

        while (++i < n) d += sum(node.children[i]);

        return d;
    }

    return node.size;
}

export function flatten(data, level = 1, path = ""){
    let flat = [];

    flat.push({
        name: data.name,
        size: data.size,
        level,
        path
    });

    if (data.children && data.children.length) {
        let i = -1,
            n = data.children.length;

        while (++i < n) flat.push(...flatten(data.children[i], level + 1, path ? `${path}-${i}` : `${i}`));
    }

    return flat;
}

export function depth(node) {
    let d = 0;

    if (node.children && node.children.length) {
        let i = -1,
            n = node.children.length;

        while (++i < n) d = Math.max(d, depth(node.children[i]));
    }

    return 1 + d;
}

export function findSum(data, level = 1) {

    data.size = sum(data);

    if (data.children && data.children.length) {
        let i = -1,
            n = data.children.length;

        while (++i < n) data.children[i] = findSum(data.children[i]);

        data.children.sort((a,b) => b.size - a.size);
    }

    return data;
}