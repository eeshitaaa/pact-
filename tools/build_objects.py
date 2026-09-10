"""Rebuild Pact's original object kit. Run with Blender --background --python tools/build_objects.py.
Exports editable source, portable GLBs, runtime mesh data and transparent stills.
No external assets, fonts, add-ons or Python dependencies are required.
"""
import bpy, math, json, os
from mathutils import Vector
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'objects'
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.preferences.filepaths.save_version = 0
scene = bpy.context.scene
materials = {}

def material(name, color, metallic=0, roughness=.4):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Metallic'].default_value=metallic; p.inputs['Roughness'].default_value=roughness
    materials[name]={'color':list(color),'metalness':metallic,'roughness':roughness}
    return m
wood=material('Walnut',(.04,.013,.006),0,.34)
felt=material('Oxblood',(.045,.0035,.010),0,.72)
felt.node_tree.nodes.get('Principled BSDF').inputs['Specular IOR Level'].default_value=.16
enamel=material('Ivory',(.83,.74,.57),.05,.3)
brass=material('Champagne',(.58,.36,.14),.78,.27)
dark=material('Ink',(.018,.013,.014),0,.5)
paper=material('Paper',(.83,.75,.6),0,.8)
glass=material('SmokedGlass',(.62,.45,.36),0,.065)
glass.node_tree.nodes.get('Principled BSDF').inputs['Transmission Weight'].default_value=1
materials['SmokedGlass']['transmission']=.9
photo=material('Midnight',(.024,.045,.078),0,.65)
green=material('Sage',(.27,.36,.26),0,.5)
kit={}; current=None

def register(o,name,mat):
    o.name=name
    for c in list(o.users_collection): c.objects.unlink(o)
    current.objects.link(o)
    if mat:o.data.materials.append(mat)
    return o

def box(name,loc,size,mat,bevel=.07):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=register(bpy.context.object,name,mat);o.dimensions=size
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    if bevel:
        mod=o.modifiers.new('Crafted edges','BEVEL');mod.width=bevel;mod.segments=3
        mod=o.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL')
    return o

def cylinder(name,loc,r,depth,mat,vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=r,depth=depth,location=loc)
    o=register(bpy.context.object,name,mat)
    mod=o.modifiers.new('Soft machined edge','BEVEL');mod.width=.025;mod.segments=3
    for p in o.data.polygons:p.use_smooth=True
    o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    return o

def ring(name,loc,r,tube,mat):
    bpy.ops.mesh.primitive_torus_add(major_radius=r,minor_radius=tube,major_segments=48,minor_segments=8,location=loc)
    o=register(bpy.context.object,name,mat)
    for p in o.data.polygons:p.use_smooth=True
    return o

def text(name,words,loc,size,mat,align='CENTER'):
    curve=bpy.data.curves.new(name,'FONT');curve.body=words;curve.size=size;curve.align_x=align;curve.align_y='CENTER';curve.extrude=.0015;curve.resolution_u=3
    o=bpy.data.objects.new(name,curve);current.objects.link(o);o.location=loc;curve.materials.append(mat);return o

def base(w=4.8,h=2.3):
    box('walnut_base',(0,0,.05),(w,h,.3),wood,.17)
    box('brass_inlay',(0,0,.21),(w-.12,h-.12,.035),brass,.14)
    box('felt_inset',(0,0,.24),(w-.23,h-.23,.05),felt,.12)

def new(name):
    global current
    current=bpy.data.collections.new(name);scene.collection.children.link(current);kit[name]=current

new('habit');base()
for i,label in enumerate(['MON','TUE','WED','THU','FRI']):
    x=(i-2)*.84
    box(f'day_{i}',(x,.05,.39),(.72,1.2,.22),felt if i==3 else enamel,.085)
    text(f'day_label_{i}',label,(x,.4,.51),.105,enamel if i==3 else dark)
    a=box(f'marker_{i}_a',(x-.065,-.16,.525),(.07,.26,.035),brass,.022);a.rotation_euler.z=.6;a.hide_render=i>=3
    b=box(f'marker_{i}_b',(x+.055,-.10,.525),(.07,.42,.035),brass,.022);b.rotation_euler.z=-.55;b.hide_render=i>=3
    o=ring(f'marker_{i}',(x,-.15,.52),.13,.013,brass);o.hide_render=i<3
text('tray_title','THE QUIET CLUB',(0,.9,.275),.115,brass)
text('tray_motto','YOUR WORD. MADE REAL.',(0,-.85,.275),.09,brass)

new('prediction');base(4.4,3)
for i,x in enumerate([-1,1]):
    box(f'sealed_card_{i}',(x,0,.32),(1.62,2.26,.085),brass,.11)
    box(f'card_back_{i}',(x,0,.37),(1.55,2.19,.065),felt,.1)
    text(f'card_name_{i}', 'YES' if i==0 else 'NO',(x,.77,.412),.14,enamel)
    ring(f'card_rosette_{i}',(x,0,.42),.45,.017,brass)
    ring(f'card_rosette_inner_{i}',(x,0,.42),.39,.009,brass)
    text(f'card_monogram_{i}','P',(x,0,.426),.46,brass)
    text(f'card_hidden_{i}','SEALED',(x,-.82,.415),.085,enamel)

new('race');base(4.7,2.8)
for i,initial in enumerate(['MR','EA','JV','RS']):
    y=(i-1.5)*.52
    box(f'rail_{i}',(0,y,.29),(3.95,.025,.025),brass,.009)
    x=[1.3,.55,-.35,-.9][i]
    cylinder(f'racer_{i}',(x,y,.38),.19,.14,brass if i==0 else enamel)
    text(f'racer_label_{i}',initial,(x,y,.457),.085,dark)
for i in range(5):box(f'finish_{i}',(1.87,(i-2)*.41,.3),(.08,.21,.03),enamel,.003)
text('race_title','A LITTLE FRIENDLY COMPETITION',(0,1.15,.28),.09,brass)

new('number');base(4.3,2.7)
for i,x in enumerate([-1.3,0,1.3]):
    box(f'guess_slip_{i}',(x,.05,.34),(1.1,1.65,.11),paper,.06)
    text(f'guess_back_{i}','?',(x,.1,.405),.6,felt)
    text(f'guess_label_{i}','FACE DOWN',(x,-.5,.406),.067,dark)
box('actual_line',(0,-.95,.32),(3.8,.035,.04),brass,.01)

new('jar')
cylinder('jar_base',(0,0,.09),1.12,.18,brass)
# Lathed continuous glass wall, visibly hollow, with a stable opaque pedestal.
profile=[(1.0,.18),(1.07,.28),(1.08,1.86),(1.0,2.08),(.98,2.2),(.88,2.2),(.9,2.05),(.97,1.83),(.97,.31),(.9,.27)]
verts=[];faces=[];n=64
for r,z in profile:
    verts.extend([(r*math.cos(a*math.tau/n),r*math.sin(a*math.tau/n),z) for a in range(n)])
for j in range(len(profile)-1):
    for i in range(n):faces.append((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i))
mesh=bpy.data.meshes.new('Hollow vessel');mesh.from_pydata(verts,[],faces);mesh.update();o=bpy.data.objects.new('jar_glass',mesh);current.objects.link(o);mesh.materials.append(glass)
for p in mesh.polygons:p.use_smooth=True
ring('jar_lip',(0,0,2.2),.94,.065,brass)
for i in range(8):
    angle=i*2.4;r=.25+(i%3)*.15
    o=cylinder(f'coin_{i}',(math.cos(angle)*r,math.sin(angle)*r,.33+(i%3)*.1),.31,.06,brass,32);o.rotation_euler=(.1*(i%3),.2*(i%2),angle)
# A label attached to the front of the vessel; always opaque.
o=box('jar_plaque',(0,-1.057,1.3),(1.0,.045,.51),felt,.06)
o=text('jar_label','THE JAR',(0,-1.086,1.38),.13,enamel);o.rotation_euler.x=math.pi/2
o=text('jar_subtitle','KEEP IT HONEST',(0,-1.088,1.19),.065,brass);o.rotation_euler.x=math.pi/2

new('elimination');base(4.8,2.9)
for i,x in enumerate([-1.65,-.55,.55,1.65]):
    box(f'pass_{i}',(x,0,.35),(1.,1.95,.09),felt if i<3 else dark,.08)
    ring(f'pass_seal_{i}',(x,.12,.404),.24,.018,brass if i<3 else wood)
    text(f'pass_name_{i}',['EA','LS','VK','NA'][i],(x,.15,.407),.18,enamel if i<3 else brass)
    text(f'pass_status_{i}','IN PLAY' if i<3 else 'RETIRED',(x,-.57,.406),.07,brass)
    box(f'pass_slot_{i}',(x,.7,.409),(.35,.075,.007),dark,.024)

new('proof')
box('proof_paper',(0,0,.16),(2.55,3.1,.085),paper,.025)
box('proof_photo',(0,.32,.21),(2.2,1.91,.016),photo,.008)
cylinder('moon',(.65,.89,.228),.25,.008,enamel)
text('proof_time','11:42',(0,.3,.232),.38,enamel)
text('proof_caption','LIGHTS OUT',(0,-.3,.232),.15,enamel)
text('proof_signature','Naina\'s proof',(-.8,-.95,.22),.17,dark,'LEFT')
cylinder('wax_seal',(.81,-1.05,.255),.29,.06,felt)
ring('wax_ridge',(.81,-1.05,.292),.24,.015,brass)
text('wax_monogram','P',(.81,-1.05,.294),.27,brass)

new('member')
box('member_edge',(0,0,.17),(4.1,2.55,.1),brass,.16)
box('member_leather',(0,0,.23),(4.04,2.49,.075),felt,.14)
text('member_brand','P A C T',(-1.65,.79,.273),.2,enamel,'LEFT')
text('member_edition','THE PRIVATE GAME ROOM',(-1.65,.45,.273),.086,brass,'LEFT')
text('member_name','Eeshita Anand',(-1.65,-.39,.273),.3,enamel,'LEFT')
text('member_stat','12 DAY STREAK',(-1.65,-.82,.273),.12,brass,'LEFT')
ring('member_mark',(1.25,.42,.28),.35,.022,brass)
text('member_p','P',(1.25,.42,.28),.4,brass)

# Export evaluated geometry once. The runtime adapter avoids an additional loader dependency.
deps=bpy.context.evaluated_depsgraph_get()
for name,col in kit.items():
    data={'version':1,'name':name,'materials':materials,'meshes':[]};triangles=0
    for obj in col.objects:
        if obj.type not in {'MESH','FONT'}:continue
        ev=obj.evaluated_get(deps);mesh=ev.to_mesh();mesh.calc_loop_triangles();matrix=obj.matrix_world
        positions=[]
        for v in mesh.vertices:
            p=matrix@v.co;positions.extend([round(p.x,5),round(p.z,5),round(-p.y,5)])
        indices=[v for tri in mesh.loop_triangles for v in tri.vertices];triangles+=len(indices)//3
        data['meshes'].append({'name':obj.name,'material':obj.data.materials[0].name,'positions':positions,'indices':indices})
        ev.to_mesh_clear()
    (OUT/f'{name}.json').write_text(json.dumps(data,separators=(',',':')))
    bpy.ops.object.select_all(action='DESELECT')
    for obj in col.objects:obj.select_set(True)
    bpy.ops.export_scene.gltf(filepath=str(OUT/f'{name}.glb'),use_selection=True,export_apply=True,export_animations=False)
    print(f'PACT ASSET {name}: {triangles} triangles',flush=True)

# Matching studio lighting for the fallback portraits.
for col in kit.values():col.hide_render=True
scene.world=bpy.data.worlds.new('Warm studio');scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.36,.31,.27,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value=.25
studio=bpy.data.collections.new('Studio');scene.collection.children.link(studio);current=studio
def area(name,loc,power,size,color):
    light=bpy.data.lights.new(name,'AREA');light.energy=power;light.shape='DISK';light.size=size;light.color=color
    o=bpy.data.objects.new(name,light);studio.objects.link(o);o.location=loc;o.rotation_euler=(Vector((0,0,.4))-o.location).to_track_quat('-Z','Y').to_euler()
area('Warm key',(-3,-4,7),650,6,(1,.85,.68))
area('Silk fill',(4,0,5),250,5,(.83,.9,1))
area('Long rim',(-1,4,4),650,3,(1,.68,.38))
camera_data=bpy.data.cameras.new('Portrait camera');camera=bpy.data.objects.new('Portrait camera',camera_data);studio.objects.link(camera);scene.camera=camera
camera_data.type='ORTHO';camera_data.ortho_scale=6.4
scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True
scene.render.resolution_x=960;scene.render.resolution_y=720;scene.render.resolution_percentage=100
scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA'
scene.view_settings.view_transform='AgX'
for name,col in kit.items():
    col.hide_render=False
    camera.location=(4.2,-6.4,7.2) if name!='jar' else (3.6,-6.8,4.8)
    target=Vector((0,0,.15 if name!='jar' else 1.0));camera.rotation_euler=(target-camera.location).to_track_quat('-Z','Y').to_euler()
    camera_data.ortho_scale=6.1 if name!='jar' else 4.1
    scene.render.filepath=str(OUT/f'{name}.png');bpy.ops.render.render(write_still=True)
    col.hide_render=True
kit['habit'].hide_render=False
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'pact-object-library.blend'))
print('PACT OBJECT KIT COMPLETE',flush=True)
