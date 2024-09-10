// src/recintos-zoo.js
class RecintosZoo {
    constructor() {
        this.animais = {
            "LEAO": { tamanho: 3, bioma: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, bioma: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, bioma: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, bioma: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false },
        };

        this.recintos = [
            { numero: 1, bioma: ["savana"], tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: ["floresta"], tamanho: 5, animais: [] },
            { numero: 3, bioma: ["savana", "rio"], tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: ["rio"], tamanho: 8, animais: [] },
            { numero: 5, bioma: ["savana"], tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] },
        ];
    }

    analisaRecintos(especie, quantidade) {
        // Verificação de espécie e quantidade
        if (!this.animais[especie]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
    
        const animalInfo = this.animais[especie];
        const recintosViaveis = [];
    
        for (const recinto of this.recintos) {
            let espacoOcupado = 0;
            let temCarnivoro = false;
            let temOutrosAnimais = false;
            let macacoSozinho = false;
            let mesmaEspecie = false;
    
            console.log(`Verificando Recinto ${recinto.numero} com bioma ${recinto.bioma} e animais: ${JSON.stringify(recinto.animais)}`);
    
            // Calcula o espaço ocupado e verifica condições de compatibilidade
            for (const animalRecinto of recinto.animais) {
                const infoAnimalRecinto = this.animais[animalRecinto.especie];
                espacoOcupado += animalRecinto.quantidade * infoAnimalRecinto.tamanho;
    
                if (infoAnimalRecinto.carnivoro && infoAnimalRecinto.especie !== especie) {
                    temCarnivoro = true;
                }
                if (animalRecinto.especie === especie) {
                    mesmaEspecie = true;
                }
                if (animalRecinto.especie === "MACACO" && animalRecinto.quantidade === 1) {
                    macacoSozinho = true;
                }
                temOutrosAnimais = true;
            }
    
            // Verifica se o bioma é adequado
            const biomaAdequado = animalInfo.bioma.some(bioma => recinto.bioma.includes(bioma));
            console.log(`Bioma adequado para ${especie}? ${biomaAdequado}`);
            if (!biomaAdequado) continue; // Filtra recintos com biomas inadequados (ex.: "rio" para macacos)
    
            // Regras de compatibilidade de carnívoros
            if (animalInfo.carnivoro && temOutrosAnimais) continue;
    
            // Regra do hipopótamo
            if (especie === "HIPOPOTAMO" && (!recinto.bioma.includes("savana") || !recinto.bioma.includes("rio"))) continue;
    
            // Verifica se o macaco ficará sozinho
            if (especie === "MACACO" && quantidade === 1 && !temOutrosAnimais) continue;
            if (macacoSozinho) continue;
    
            // Calcula o espaço necessário e o espaço livre
            let espacoNecessario = quantidade * animalInfo.tamanho;
            if (temOutrosAnimais && !mesmaEspecie) espacoNecessario += 1; // Espaço extra para espécies diferentes
    
            console.log(`Espaço ocupado: ${espacoOcupado}, Espaço necessário: ${espacoNecessario}, Tamanho do recinto: ${recinto.tamanho}`);
    
            const espacoTotalOcupado = espacoOcupado + espacoNecessario;
            if (espacoTotalOcupado <= recinto.tamanho) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: recinto.tamanho - espacoTotalOcupado,
                    espacoTotal: recinto.tamanho
                });
            }
        }
    
        // Ordenar os recintos viáveis por número
        recintosViaveis.sort((a, b) => a.numero - b.numero);
    
        if (recintosViaveis.length > 0) {
            return {
                recintosViaveis: recintosViaveis.map(
                    r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`
                )
            };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }    
}        

export { RecintosZoo as RecintosZoo };
