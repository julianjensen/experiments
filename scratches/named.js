/** ******************************************************************************************************************
 * @file Describe what named does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 23-Apr-2018
 *********************************************************************************************************************/
"use strict";


function create_class_with_name( name )
{
    return { [ name ]: class {
            show()
            {
                console.log( 'self name:', this.constructor.name );
            }
        }
    }[ name ];
}

let nameOfMyClass = "User",
    myClass = create_class_with_name( nameOfMyClass ),
    inst = new myClass();

inst.show();


function create_thing_with_name( name, cls )
{
    return { [ name ]: class extends cls {} }[ name ];
}

let Model = class {
        show()
        {
            console.log( 'self name:', this.constructor.name );
        }
    },
    MyModel = create_thing_with_name( "Group", Model ),
    group = new MyModel();

group.show();

