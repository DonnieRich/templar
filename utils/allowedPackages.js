export const scope = '@ricciodev';
export const starterKits = [
    'vue'
];

export function allowedPackages() {
    return starterKits.map(kit => `${scope}/${kit}-starter-kit`);
}