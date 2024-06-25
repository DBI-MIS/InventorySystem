<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {

        if (! Gate::allows('viewAny', User::class)) { 
            abort(403, 'You are not authorized to view users.');
        }
        
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
        }
        $users = $query->orderBy($sortField, $sortDirection)
        ->paginate(12);

        return inertia("User/Index", [
            "users" => UserResource::collection($users),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
         $data = $request->validated();
        // dd($data);
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        User::create($data);
        return to_route('user.index')->with('success', 'User created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(StoreUserRequest $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $response = Gate::authorize('update', $user);

        if ($response->allowed()) {
            
            return inertia('User/Edit',[
                'user' => new UserResource($user),
            ]);
        }
        else
        {
            return abort(403, $response->message());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        return to_route('user.index')->with('success', "User \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $response = Gate::authorize('delete', $user);

        if ($response->allowed()) {
        
            $name = $user->name;
            $user->delete();
            
            return to_route('user.index')->with('success', "User \" $name \" was deleted!");
        }
        else
        {
            return abort(403, $response->message());
        }
    }
}
