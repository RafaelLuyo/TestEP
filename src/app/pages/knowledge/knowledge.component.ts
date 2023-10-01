import {Component, OnInit, ViewChild} from '@angular/core';
import {KnowledgeService} from "../../services/knowledge.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Knowledge} from "../../model/knowledge";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as _ from 'lodash';
@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {
    KnowledgeForm: FormGroup;
    knowledgeData: Knowledge;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'title', 'urlToImage', 'summary', 'content' ];

    constructor( public service: KnowledgeService, private router: Router, private builder: FormBuilder) {
        this.knowledgeData = {} as Knowledge;
        this.dataSource = new MatTableDataSource<any>();
        this.KnowledgeForm = this.builder.group({
            title: ['', [Validators.required, Validators.maxLength(60)]],
            urlToImage: [''],
            summary: [''],
            content: ['']
        })
    }
    get title(){return this.KnowledgeForm.controls['title']}
    get urlToImage(){return this.KnowledgeForm.controls['urlToImage']}
    get summary(){return this.KnowledgeForm.controls['summary']}
    get content(){return this.KnowledgeForm.controls['content']}
    @ViewChild('KnowledgeForm', {static: false})
    form! : NgForm;

    @ViewChild(MatPaginator, {static: true})
    paginator!: MatPaginator;

    @ViewChild(MatSort)
    sort!: MatSort;

    isEditKnowledge: boolean | undefined;


    ngOnInit(): void {
        //this.dataSource.paginator = this.paginator;
        this.getAllKnowledge();

    }
    getAllKnowledge(){
        this.service.getAll().subscribe((response :any) => {
            this.dataSource.data = response;

        });
    }

    addKnowledge(){
        if (this.title.hasError('required') || this.summary.hasError('required')
            || this.urlToImage.hasError('required') || this.content.hasError('required')){
            console.log('there is value required');
            return ;
        }else{
            console.log('data sent');
        }

        this.knowledgeData.id = 0;
        this.service.create(this.knowledgeData).subscribe((response: any)=>{
            this.dataSource.data.push({...response});
            this.dataSource.data = this.dataSource.data.map((o: any)=>{return o;})
        })
    }



    updateKnowledge(){
        if (this.title.hasError('required') || this.summary.hasError('required')
            || this.urlToImage.hasError('required') || this.content.hasError('required')){
            console.log('there is value required');
            return ;
        }else{
            console.log('data sent');
        }

        this.service.update(this.knowledgeData.id, this.knowledgeData).subscribe((response:any)=>{
            this.dataSource.data = this.dataSource.data.map((o: Knowledge) => {
                if (o.id == response.id) {
                    o = response;
                }
                return o;
            });
        })
    }


    cancelKnowledge(){
        this.isEditKnowledge=false;
        this.KnowledgeForm.reset();
    }

    onSubmit() {
        if (this.KnowledgeForm.valid) {
            console.log('valid');
            if (this.isEditKnowledge) {
                console.log(' about to update');
                this.updateKnowledge();
            } else {
                console.log('about to add');
                // this.addChallenge();
            }
            this.cancelKnowledge();
        } else {
            console.log('Invalid data');
        }
    }
}
