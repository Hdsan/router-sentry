import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class RouterService {
    @Cron(CronExpression.EVERY_MINUTE)
    handleCron() {
        this.verifyRouter();
    }

    verifyRouter() : string[] {
        console.log("router")
        exec('arp -a', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o comando: ${error.message}`);
                return [];
            }
    
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return [];
            }

            const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([a-fA-F0-9\-]{17})/g;
            let match;
            const resultArray = [];
    
            while ((match = regex.exec(stdout)) !== null) {
                resultArray.push(`${match[1]} - ${match[2]}`);
            }
    
            console.log(resultArray);
            return resultArray;
        });
        return []
    }
}
