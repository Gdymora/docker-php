function roleWarehouseTechnologistAdmin(): string[] {
    return ['economist', 'accountant', 'warehouse_keeper_synt', 'warehouse_keeper_nat', 'technologist', 'admin'];
}

function roleAdmin(): string[] {
    return ['admin'];
}

function roleAllProductDetailCard(): string[] {
    return ['technologist', 'economist', 'warehouse_keeper_synt', 'warehouse_keeper_nat', 'photographer', 'admin'];
}

function roleEconomist(): string[] {
    return ['economist'];
}

function hasRole(needRoles: string[], userRoles: String[]): boolean {
    const currentRoles = userRoles;
    return currentRoles?.some((elem: any) => needRoles.includes(elem));
}

export { hasRole, roleAdmin, roleWarehouseTechnologistAdmin, roleEconomist, roleAllProductDetailCard };
